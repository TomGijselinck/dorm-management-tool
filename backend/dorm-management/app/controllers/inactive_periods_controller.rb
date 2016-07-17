class InactivePeriodsController < ApplicationController
  include RailsApiAuth::Authentication

  before_action :authenticate!
  before_action :set_inactive_period, only: [:show, :update, :destroy]

  def index
    render :json => InactivePeriod.all
  end

  def show
    render :json => @inactive_period.to_json
  end

  def create
    @inactive_period = InactivePeriod.new(inactive_period_params)
    if @inactive_period.save
      render json: {status: :created,
                    loaction: inactive_periods_url(@inactive_period)}
    else
      render json: @inactive_period.errors, status: :unprocessable_entity
    end
  end

  def update
    if @inactive_period.update(inactive_period_params)
      puts @inactive_period.end
      render json: @inactive_period , status: :ok, location: @inactive_period
    else
      render json: @inactive_period.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @inactive_period.destroy
    head :no_content
  end

  private
    def set_inactive_period
      @inactive_period = InactivePeriod.find(params[:id])
    end

    def inactive_period_params
      params.require(:inactive_period).permit(:start, :end)
    end
end
