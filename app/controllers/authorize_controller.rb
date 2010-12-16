class AuthorizeController < ApplicationController
  # Extended permission:  http://developers.facebook.com/docs/authentication/permissions
  AUTHORIZE_URL = "https://graph.facebook.com/oauth/authorize?client_id=#{FACEBOOK_APP_ID}&redirect_uri=http://#{DOMAIN}/authorize/redirect/"
  SCOPE         = "user_events,user_photo_video_tags,friends_photo_video_tags,user_photos,friends_photos,user_checkins,friends_checkins,offline_access,user_birthday"
  REDIRECT_URL  = "http://#{DOMAIN}/authorize/redirect/"

  def index
    redirect_to("#{AUTHORIZE_URL}&scope=#{SCOPE}")
  end

  def redirect
    origin_identifier = exchange_origin_identifier(params[:code])
    access_token = exchange_access_token(params[:code])

    User.import(origin_identifier, access_token)
    redirect_to "http://#{DOMAIN}/"
  end

  protected
  def exchange_access_token(code)
    require 'net/http'

    @query_string = "?client_id=#{FACEBOOK_APP_ID}&client_secret=#{FACEBOOK_APP_SECRET}&redirect_uri=#{REDIRECT_URL}&code=#{code}"
    url = URI.parse("https://graph.facebook.com:443/oauth/access_token")

    request = Net::HTTP::Get.new("#{url.path}#{@query_string}",{"Content-Type"=>"text/json"})
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    response = http.start{|http| http.request(request)}.body
    response[13..response.length]   #Apparently Facebook doesn't return JSON here'
  end
  def exchange_origin_identifier(code)
    code.scan(/-(.*)\|/).first.first
  end
end