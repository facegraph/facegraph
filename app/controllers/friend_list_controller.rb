class FriendListController < ApplicationController
  def index
    @relevant_nodes = Array.new()

    unless params[:api_response].blank?
      for index in (0..params[:api_response].count-1)
        @relevant_nodes << params[:api_response][index.to_s]
      end
    end
    #puts @relevant_nodes


    @html_content = render_to_string( :partial => 'render_api_response.html.erb', :locals => {:relevant_nodes => @relevant_nodes} )
    render :json => { :html => @html_content }
  end
end