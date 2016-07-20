class GarbageBagsController < ApplicationController

  before_action 'check_for_valid_auth_token'
  before_action :set_garbage_bag, only: [:show, :edit, :update, :destroy]

  # GET /garbage_bags
  # GET /garbage_bags.json
  def index
    @garbage_bags = GarbageBag.all
  end

  # GET /garbage_bags/1
  # GET /garbage_bags/1.json
  def show
  end

  # GET /garbage_bags/new
  def new
    @garbage_bag = GarbageBag.new
  end

  # GET /garbage_bags/1/edit
  def edit
  end

  # POST /garbage_bags
  # POST /garbage_bags.json
  def create
    @garbage_bag = GarbageBag.new(garbage_bag_params)

    respond_to do |format|
      if @garbage_bag.save
        format.html { redirect_to @garbage_bag, notice: 'Garbage bag was successfully created.' }
        format.json { render :show, status: :created, location: @garbage_bag }
      else
        format.html { render :new }
        format.json { render json: @garbage_bag.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /garbage_bags/1
  # PATCH/PUT /garbage_bags/1.json
  def update
    user_id = @garbage_bag.user_id
    respond_to do |format|
      if @garbage_bag.update(garbage_bag_params)
        if user_id != @garbage_bag.user_id
          UserMailer.new_duty(@garbage_bag).deliver_later
        end
        format.html { redirect_to @garbage_bag, notice: 'Garbage bag was successfully updated.' }
        format.json { render :show, status: :ok, location: @garbage_bag }
      else
        format.html { render :edit }
        format.json { render json: @garbage_bag.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /garbage_bags/1
  # DELETE /garbage_bags/1.json
  def destroy
    @garbage_bag.destroy
    respond_to do |format|
      format.html { redirect_to garbage_bags_url, notice: 'Garbage bag was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_garbage_bag
      @garbage_bag = GarbageBag.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def garbage_bag_params
      params.require(:garbage_bag).permit(:name, :status, :user_id, :dorm_id)
    end
end
