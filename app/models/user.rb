class User < ActiveRecord::Base
  def self.import(origin_identifier, access_token)
    node = OpenGraph::Node.new(origin_identifier, access_token).profile

    user = User.find_or_initialize_by_origin_identifier(origin_identifier)


    user.update_attributes({:access_token => access_token,
                            :first_name => node["first_name"],
                            :last_name => node["last_name"],
                            :sex => node["gender"],
                            :date_of_birth => DateTime.parse(node["birthday"]),
                            :locale => node["locale"],
                            :time_zone => node["timezone"]
                           })
  end
end