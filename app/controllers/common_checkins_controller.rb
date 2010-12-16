class CommonCheckinsController < ApplicationController
  before_filter :load_maps_environment
  before_filter :load_friend, :only => [:index]
  before_filter :render_widget, :only => [:index]

  def index
    @layout_column = 2
  end

  def render_api_response
    super
    require 'geokit'

    @visited_cities = Hash.new

    for checkin in @relevant_nodes do
      if checkin['place']['location']['street'].blank?
        #Use memcached to store reverse_geocode info
        geo_hash = Cache.get("reverse_geocode:#{checkin['place']['location']['latitude']},#{checkin['place']['location']['longitude']}")
        if geo_hash.blank?
          geo_loc = Geokit::Geocoders::MultiGeocoder.reverse_geocode([checkin['place']['location']['latitude'], checkin['place']['location']['longitude']])
          
          geo_hash = {}
          geo_hash['street']  = geo_loc.street_address
          geo_hash['city']    = geo_loc.city
          geo_hash['state']   = geo_loc.state || geo_loc.province
          geo_hash['country'] = geo_loc.country
          geo_hash['zip']     = geo_loc.zip

          Cache.set("reverse_geocode:#{checkin['place']['location']['latitude']},#{checkin['place']['location']['longitude']}", geo_hash)
        end

        checkin['place']['location']['street'] = geo_hash['street']
        checkin['place']['location']['city'] = geo_hash['city']
        checkin['place']['location']['state'] = geo_hash['state']
        checkin['place']['location']['country'] =geo_hash['country']
        checkin['place']['location']['zip'] =geo_hash['zip']

        @visited_cities["#{geo_hash['city']} #{geo_hash['state']}"] = true  # {city state => true} hash
      end
    end

    #render :partial => 'render_api_response', :count => @relevant_nodes.count, :as=> :html


    #@template.template_format = :html
    @html_content = render_to_string( :partial => 'render_api_response.html.erb', :locals => {:relevant_nodes => @relevant_nodes} )
    render :json => { :count => @relevant_nodes.count,
                      :html => @html_content,
                      :visited_cities => @visited_cities,
                      :relevant_nodes => @relevant_nodes
    }
  end

  def load_maps_environment
    @google_maps_api_key = APPLICATION_CONFIG['GoogleMaps']['api_key']
  end

  def load_node_type
    @node_type ||= "checkin_memories"
  end
end