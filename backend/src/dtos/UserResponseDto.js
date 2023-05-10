class UserResponseDto {
  accessToken
  user

  constructor(model) {
    this.accessToken = model.accessToken
    this.user = model.user
  }
}

export default UserResponseDto
