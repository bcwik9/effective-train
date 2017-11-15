class ClientsController < ApplicationController

  def dashboard    
  end

  def build_list
    @part = Part.find_by vendor_part_id: params[:vendor_part_id]
    if @part.nil?
      flash[:warning] = "Part with id #{params[:vendor_part_id]} wasn't found."
      redirect_to dashboard_path
    end
  end
end
