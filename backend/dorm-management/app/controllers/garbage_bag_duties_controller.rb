class GarbageBagDutiesController < ApplicationController

  before_action 'check_for_valid_auth_token'
  before_action :set_garbage_bag_duty, only: [:show, :update, :destroy]

  def index
    render :json => GarbageBagDuty.all
  end

  def show
  end

  def edit
  end

  def create
    @garbage_bag_duty = GarbageBagDuty.new(garbage_bag_duty_params)
    if @garbage_bag_duty.save
      UserMailer.new_duty(@garbage_bag_duty.garbage_bag).deliver_later
      render json: {status: :created, location: garbage_bag_url(@garbage_bag_duty)}
    else
      render json: @garbage_bag_duty.errors, status: :unprocessable_entity
    end
  end

  def update
    if @garbage_bag_duty.update(garbage_bag_duty_params)
      render :show, status: :ok, location: @garbage_bag_duty
    else
      render json: @garbage_bag_duty.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @garbage_bag_duty.destroy
    head :no_content
  end

  private
    def set_garbage_bag_duty
      @garbage_bag_duty = GarbageBagDuty.find(params[:id])
    end

    def garbage_bag_duty_params
      params.require(:garbage_bag_duty)
          .permit(:datetime, :user_id, :garbage_bag_id)
    end

end
