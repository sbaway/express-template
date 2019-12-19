const config = {
  authUser: {
    user: 'rokserver',
    pass: 'rokserver123',
  },

  secret: {
    salt: 'rrr35w48b0f74e7bb48d77781f7betyu',
  },

  jwt: {
    privateKey: 'sffir2bgl73c8fr71vfyl6rmk46ajortm0nyu8vyuwn4s4i',
    payload: {
      iss: 'hrit server',
    },
    option: {
      expiresIn: 1000 * 60 * 60,
      algorithm: 'HS256',
    },
  },
}

export default config
