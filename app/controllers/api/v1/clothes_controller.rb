class Api::V1::ClothesController < ApplicationController
  before_action :set_clothe, only: %i[ show update destroy ]

  # GET /clothes
  def index
    @clothes = Clothe.all

    render json: @clothes
  end

  # GET /clothes/1
  def show
    render json: @clothe
  end

  # POST /clothes
  def create
    @clothe = Clothe.new(clothe_params)

    if @clothe.save
      render json: @clothe, status: :created, location: @clothe
    else
      render json: @clothe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clothes/1
  def update
    if @clothe.update(clothe_params)
      render json: @clothe
    else
      render json: @clothe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /clothes/1
  def destroy
    @clothe.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_clothe
      @clothe = Clothe.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def clothe_params
      params.require(:clothe).permit(:description, :last_worn, :colour, :integer, :brand, :image)
    end
end
