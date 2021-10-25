import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";

import NotFound from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        meta: {
          requirestoBelogedOut: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Login.vue")
      },
      {
        path: "/register",
        name: "register",
        meta: {
          requirestoBelogedOut: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Register.vue")
      }
      // { path: "*", component: NotFound }
    ]
  },
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          requiresAuth: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Dashboard.vue")
      },
      {
        path: "/icons",
        name: "icons",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Icons.vue")
      },
      {
        path: "/profile",
        name: "profile",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/UserProfile.vue"
          )
      },
      {
        path: "/maps",
        name: "maps",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/GoogleMaps.vue")
      },
      {
        path: "/drivers",
        name: "drivers",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Drivers.vue")
      },
      {
        path: "/driver/:id",
        name: "driver",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Driver.vue")
      },
      {
        path: "/addDriver",
        name: "addDrivers",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/AddDriver.vue")
      },
      {
        path: "/trucks",
        name: "trucks",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Trucks.vue")
      },
      {
        path: "/truck/:id",
        name: "truck",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Truck.vue")
      },
      {
        path: "/addTruck",
        name: "addTrucks",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/AddTruck.vue")
      },
      {
        path: "/trips",
        name: "trips",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Trips.vue")
      },
      {
        path: "/trip/:id",
        name: "trip",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Trip.vue")
      },
      {
        path: "/addTrip",
        name: "addTrips",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/AddTrip.vue")
      },
      {
        path: "/create-pickup",
        name: "create-pickup",
        meta: {
          requiresAuth: true
        },

        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/create-pickup.vue")
      },
      {
        path: "/notifications",
        name: "Notifications",
        meta: {
          requiresAuth: true
        },

        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Notifications.vue")
      },
      {
        path: "/resetPassword",
        name: "Reset Password",
        meta: {
          requiresAuth: true
        },

        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/ResetPassword.vue")
      },
      {
        path: "/tables",
        name: "tables",
        meta: {
          requiresAuth: true
        },

        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/RegularTables.vue")
      }
    ]
  }
];

export default routes;
