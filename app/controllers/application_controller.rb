class ApplicationController < ActionController::Base
  FACEBOOK_APP_ID = APPLICATION_CONFIG['FacebookApp']['app_id']
  FACEBOOK_APP_API_KEY = APPLICATION_CONFIG['FacebookApp']['api_key']
  FACEBOOK_APP_SECRET = APPLICATION_CONFIG['FacebookApp']['app_secret']
  DOMAIN = APPLICATION_CONFIG['Host']['domain']
  ANALYTICS_DOMAIN = APPLICATION_CONFIG['Analytics']['domain']

  before_filter :load_facebook_environment_variables
  before_filter :load_platform
  before_filter :parse_for_relevant_nodes, :only => [:render_api_response]
  before_filter :load_node_type
  before_filter :load_layout_type, :only => :index
  before_filter :load_analytics

  def render_api_response
  end

  protected

  # Look for relevent nodes only
  def parse_for_relevant_nodes
    @relevant_nodes = Array.new

    reduce(params[:api_response].to_hash)['data'].each do | node |
      if node[1]['from']['id'] == params[:friend_id]
        @relevant_nodes << node[1]
      elsif node[1]['tags']
        node[1]['tags']['data'].each do |tagged_person|
          if tagged_person['id'] == params[:friend_id]
            @relevant_nodes << node[1]
          end
        end
      end
    end
  end

  private

  # For some reason Facebook's JavaScript SDK behaves differently when making API calls to OpenGraph
  # This does a depth first traversal on the API response, look for the data key, and raises its contents by one depth
  def reduce(nodes)
    for node in nodes
      if node.class==ActiveSupport::HashWithIndifferentAccess && node['data']
        data_array = Array.new
        node['data'].map{|element|  data_array << element[1]}
        node['data'] = data_array
      end

      if node.class==Array || node.class == ActiveSupport::HashWithIndifferentAccess
        reduce (node)
      end
    end
  end

  def load_platform
    @platform = "www"
    @platform = "facebook" if params[:fb_sig_in_iframe]
  end

  def load_facebook_environment_variables
    @facebook_app_id = FACEBOOK_APP_ID
    @facebook_app_api_key = FACEBOOK_APP_API_KEY
    @facebook_app_secret = FACEBOOK_APP_SECRET
  end

  def load_friend
    #Call API
    friend_name = Cache.get("friend_name:#{params[:id]}")
    if friend_name.blank?
      friend_profile = OpenGraph::Node.new(params[:id])

      friend_name = friend_profile.profile['name']
      Cache.set("friend_name:#{params[:id]}", friend_name)
    end

    @friend_name ||= friend_name
  end

  def load_node_type
    @node_type ||= "facebook_memories"
  end

  def render_widget
    @render_widget = true
  end

  def load_layout_type
    @layout_column = 1
  end

  def fb_redirect_to(url)
    render :text => "<fb:redirect url=\"#{url}\" />"
  end

  def load_analytics
    @analytics_domain = ANALYTICS_DOMAIN
  end
end