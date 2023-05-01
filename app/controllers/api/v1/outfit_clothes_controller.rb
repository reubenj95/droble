class OutfitClothesController < ApplicationController
  before_action :set_outfit_clothe, only: %i[ show update destroy ]

  # GET /outfit_clothes
  def index
    @outfit_clothes = OutfitClothe.all

    render json: @outfit_clothes
  end

  # GET /outfit_clothes/1
  def show
    render json: @outfit_clothe
  end

  # POST /outfit_clothes
  def create
    @outfit_clothe = OutfitClothe.new(outfit_clothe_params)

    if @outfit_clothe.save
      render json: @outfit_clothe, status: :created, location: @outfit_clothe
    else
      render json: @outfit_clothe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /outfit_clothes/1
  def update
    if @outfit_clothe.update(outfit_clothe_params)
      render json: @outfit_clothe
    else
      render json: @outfit_clothe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /outfit_clothes/1
  def destroy
    @outfit_clothe.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_outfit_clothe
      @outfit_clothe = OutfitClothe.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def outfit_clothe_params
      params.fetch(:outfit_clothe, {})
    end
end
