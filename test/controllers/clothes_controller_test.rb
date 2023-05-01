require "test_helper"

class ClothesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @clothe = clothes(:one)
  end

  test "should get index" do
    get clothes_url, as: :json
    assert_response :success
  end

  test "should create clothe" do
    assert_difference("Clothe.count") do
      post clothes_url, params: { clothe: { brand: @clothe.brand, colour: @clothe.colour, description: @clothe.description, image: @clothe.image, integer: @clothe.integer, last_worn: @clothe.last_worn } }, as: :json
    end

    assert_response :created
  end

  test "should show clothe" do
    get clothe_url(@clothe), as: :json
    assert_response :success
  end

  test "should update clothe" do
    patch clothe_url(@clothe), params: { clothe: { brand: @clothe.brand, colour: @clothe.colour, description: @clothe.description, image: @clothe.image, integer: @clothe.integer, last_worn: @clothe.last_worn } }, as: :json
    assert_response :success
  end

  test "should destroy clothe" do
    assert_difference("Clothe.count", -1) do
      delete clothe_url(@clothe), as: :json
    end

    assert_response :no_content
  end
end
