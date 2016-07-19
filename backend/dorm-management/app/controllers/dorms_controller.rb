class DormsController < ApplicationController
  include RailsApiAuth::Authentication

  before_action 'check_for_valid_auth_token'
  before_action :set_dorm, only: [:show, :update, :destroy, :residents,
                                  :residents_summary]

  def index
    render :json => Dorm.all
  end

  def show
    render :json => @dorm.to_json
  end

  def create
    @dorm = Dorm.new(dorm_params)
    if @dorm.save
      render json: {status: :created, location: dorm_url(@dorm)}
    else
      render json: @dorm.errors, status: :unprocessable_entity
    end
  end

  def update
    if @dorm.update(dorm_params)
      render :show, status: :ok, location: @dorm
    else
      render json: @dorm.error, status: :unprocessable_entity
    end
  end

  def destroy
    @dorm.destroy
    head :no_content
  end

  def residents
    render json: @dorm.users.as_json(only: [:id, :name, :email, :dorm_id])
  end

  def residents_summary
    summary = []
    @dorm.users.each do |user|
      resident_summary = {}
      resident_summary[:id] = user.id
      resident_summary[:name] = user.name
      duty_summary = []
      tomorrow = Date.tomorrow
      if [7, 8, 9].include?(tomorrow.month) # summer
        user_duties =
            user.garbage_bag_duties
                .where(datetime: Date.new(tomorrow.year, 7, 1)..tomorrow)
      elsif tomorrow.month < 7 # passed new year
        user_duties =
            user.garbage_bag_duties
                .where(datetime: Date.new(tomorrow.year-1, 10, 1)..tomorrow)
      else
        user_duties =
            user.garbage_bag_duties
                .where(datetime: Date.new(tomorrow.year, 10, 1)..tomorrow)
      end
      @dorm.garbage_bags.each do |bag|
        bag_duty = {}
        bag_duty[:name] = bag.name
        bag_duty[:completed] =
            user_duties.select {|d| d.garbage_bag_id == bag.id}.count
        duty_summary.append(bag_duty)
      end
      resident_summary[:garbage_bag_duties] = duty_summary
      summary.append resident_summary
    end
    render json: summary.to_json
  end

  private
    def set_dorm
      @dorm = Dorm.find(params[:id])
    end

    def dorm_params
      params.require(:dorm).permit(:name, :user_id)
    end
end
