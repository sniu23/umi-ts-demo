export default {
  pages: {
    '/layout': { Route: 'components/route/PrivateRoute.tsx' },
  },
  plugins: [
    ['umi-plugin-routes', {
      exclude: [
        /views/,
      ],
    }],
  ]
};