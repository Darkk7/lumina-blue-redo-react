module.exports = {
  images: {
    domains: [
      'www.imageeyecareoptometrists.com',
      's3.eu-west-2.amazonaws.com',
      'ocumail-content.s3.eu-west-2.amazonaws.com',
      'www.eyecareportal.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/available_slots',
        destination: 'https://passport.nevadacloud.com/api/v1/public/appointments/available_slots',
      },
      {
        source: '/api/proxy/book_appointment',
        destination: 'https://www.eyecareportal.com/api/book_appointment/',
      },
    ];
  },
};