class InactiveWeeksController < ApplicationController
  before_action :set_inactive_week, only: [:show, :edit, :update, :destroy]

  # GET /inactive_weeks
  # GET /inactive_weeks.json
  def index
    @inactive_weeks = InactiveWeek.all
  end

  # GET /inactive_weeks/1
  # GET /inactive_weeks/1.json
  def show
  end

  # GET /inactive_weeks/new
  def new
    @inactive_week = InactiveWeek.new
  end

  # GET /inactive_weeks/1/edit
  def edit
  end

  # POST /inactive_weeks
  # POST /inactive_weeks.json
  def create
    @inactive_week = InactiveWeek.new(inactive_week_params)

    respond_to do |format|
      if @inactive_week.save
        format.html { redirect_to @inactive_week, notice: 'Inactive week was successfully created.' }
        format.json { render :show, status: :created, location: @inactive_week }
      else
        format.html { render :new }
        format.json { render json: @inactive_week.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /inactive_weeks/1
  # PATCH/PUT /inactive_weeks/1.json
  def update
    respond_to do |format|
      if @inactive_week.update(inactive_week_params)
        format.html { redirect_to @inactive_week, notice: 'Inactive week was successfully updated.' }
        format.json { render :show, status: :ok, location: @inactive_week }
      else
        format.html { render :edit }
        format.json { render json: @inactive_week.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /inactive_weeks/1
  # DELETE /inactive_weeks/1.json
  def destroy
    @inactive_week.destroy
    respond_to do |format|
      format.html { redirect_to inactive_weeks_url, notice: 'Inactive week was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inactive_week
      @inactive_week = InactiveWeek.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def inactive_week_params
      params.require(:inactive_week).permit(:start, :end, :number)
    end
end
