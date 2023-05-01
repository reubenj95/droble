class ColoursController < ApplicationController
  before_action :set_colour, only: %i[ show update destroy ]

  # GET /colours
  def index
    @colours = Colour.all

    render json: @colours
  end

  # GET /colours/1
  def show
    render json: @colour
  end

  # POST /colours
  def create
    @colour = Colour.new(colour_params)

    if @colour.save
      render json: @colour, status: :created, location: @colour
    else
      render json: @colour.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /colours/1
  def update
    if @colour.update(colour_params)
      render json: @colour
    else
      render json: @colour.errors, status: :unprocessable_entity
    end
  end

  # DELETE /colours/1
  def destroy
    @colour.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_colour
      @colour = Colour.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def colour_params
      params.require(:colour).permit(:name, :rgb, :yuv, :complementary)
    end
end
