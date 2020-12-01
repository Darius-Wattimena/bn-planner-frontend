# Nomination planner front-end

To run the front-end you need to have a `Settings.jsx` file in the source folder (src)

**Settings.jsx template:**
```jsx
export const ENV = {
  is_dev: true, // shows an indication when its dev
  api_url: "http://localhost:8080/",
  osu: {
    id: 0, // osu! OAuth client ID
    redirect: "http://localhost:3000/login"
  }
};
```
