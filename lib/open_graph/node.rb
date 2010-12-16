module OpenGraph
  class Node
    def initialize(origin_identifier, access_token="", max_paginate_level=9)
      @origin_identifier  = origin_identifier
      @access_token       = access_token
      @base_url = access_token.blank? ? "http://graph.facebook.com/" : "https://graph.facebook.com:443/"
      @max_paginate_level = max_paginate_level
      @current_paginate_level = 0
    end

    def profile
      graph_request("")
    end

    def friends
      graph_request("friends")
    end

    def news_feed
      graph_request("home")
    end

    def profile_feed
      graph_request("feed")
    end

    def likes
      graph_request("likes")
    end

    def movies
      graph_request("movies")
    end

    def music
      graph_request("music")
    end

    def books
      graph_request("books")
    end

    def notes
      graph_request("notes")
    end

    def photo_tags
      graph_request("photos")
    end

    def photo_albums
      graph_request("albums")
    end

    def video_tag
      graph_request("videos")
    end

    def video_uploads
      graph_request("videos/uploaded")
    end

    def events
      graph_request("events")
    end

    def groups
      graph_request("groups")
    end

    def checkins
      graph_request("checkins")
    end

    def follow_paginate(url)
      
    end


    protected

    def graph_request(type)
      @query_string = "?access_token=#{CGI.escape(@access_token)}" unless @access_token.blank?
      url = URI.parse("#{@base_url}#{@origin_identifier}/#{type}#{@query_string}")

      response = perform_graph_request(url)

      @current_paginate_level = 0
      response
    end


    def perform_graph_request(url)
      require 'net/http'

      request = Net::HTTP::Get.new("#{url.path}?#{url.query}",{"Content-Type"=>"text/json"})
      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true unless @access_token.blank?
      response = JSON.parse(http.start {|http| http.request(request) }.body)

      @current_paginate_level+=1

      response_paging= response['paging']
      response_data = response['data']
      response = response['data'] unless response['data'].nil?  #CAUTION: We only need the data

      if !response_paging.nil? && response_data.count > 0  && @current_paginate_level < @max_paginate_level
        next_url = URI.parse(response_paging['next'].gsub!(/limit=\d*/, 'limit=500'))
        response|=(perform_graph_request(next_url))             #recusively go down the graph pagination tree
      end

      response
    end
  end
end