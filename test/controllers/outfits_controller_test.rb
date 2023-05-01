require "test_helper"

class OutfitsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @outfit = outfits(:one)
  end

  test "should get index" do
    get outfits_url, as: :json
    assert_response :success
  end

  test "should create outfit" do
    assert_difference("Outfit.count") do
      post outfits_url, params: { outfit: { image: @outfit.image, name: @outfit.name, occasion: @outfit.occasion, season: @outfit.season } }, as: :json
    end

    assert_response :created
  end

  test "should show outfit" do
    get outfit_url(@outfit), as: :json
    assert_response :success
  end

  test "should update outfit" do
    patch outfit_url(@outfit), params: { outfit: { image: @outfit.image, name: @outfit.name, occasion: @outfit.occasion, season: @outfit.season } }, as: :json
    assert_response :success
  end

  test "should destroy outfit" do
    assert_difference("Outfit.count", -1) do
      delete outfit_url(@outfit), as: :json
    end

    assert_response :no_content
  end
end
