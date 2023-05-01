require "test_helper"

class ColoursControllerTest < ActionDispatch::IntegrationTest
  setup do
    @colour = colours(:one)
  end

  test "should get index" do
    get colours_url, as: :json
    assert_response :success
  end

  test "should create colour" do
    assert_difference("Colour.count") do
      post colours_url, params: { colour: { complementary: @colour.complementary, name: @colour.name, rgb: @colour.rgb, yuv: @colour.yuv } }, as: :json
    end

    assert_response :created
  end

  test "should show colour" do
    get colour_url(@colour), as: :json
    assert_response :success
  end

  test "should update colour" do
    patch colour_url(@colour), params: { colour: { complementary: @colour.complementary, name: @colour.name, rgb: @colour.rgb, yuv: @colour.yuv } }, as: :json
    assert_response :success
  end

  test "should destroy colour" do
    assert_difference("Colour.count", -1) do
      delete colour_url(@colour), as: :json
    end

    assert_response :no_content
  end
end
