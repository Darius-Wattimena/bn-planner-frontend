# Nomination planner front-end

To run the front-end you need to have a `Settings.jsx` file in the source folder (src)

**Settings.jsx template:**
```jsx
export const ENV = {
  api_url: "http://localhost:8080/",
  osu: {
    id: 0, // osu! OAuth client ID
    secret: "", // osu! OAuth secret
    redirect: "http://localhost:3000/login"
  },
  proxy: ""
};
```