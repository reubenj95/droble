class Api::V1::OutfitsController < ApplicationController
  before_action :set_outfit, only: %i[ show update destroy ]

  # GET /outfits
  def index
    @outfits = Outfit.all

    render json: @outfits
  end

  # GET /outfits/1
  def show
    render json: @outfit
  end

  # POST /outfits
  def create
    @outfit = Outfit.new(outfit_params)

    if @outfit.save
      render json: @outfit, status: :created, location: @outfit
    else
      render json: @outfit.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /outfits/1
  def update
    if @outfit.update(outfit_params)
      render json: @outfit
    else
      render json: @outfit.errors, status: :unprocessable_entity
    end
  end

  # DELETE /outfits/1
  def destroy
    @outfit.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outfit
      @outfit = Outfit.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def outfit_params
      params.require(:outfit).permit(:name, :occasion, :season, :image)
    end
end
