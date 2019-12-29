// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function WithAuth(Component) {
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkToken = () => {
//       axios
//         .get("/auth/checkToken", {
//           withCredentials: true
//         })
//         .then(response => {
//           if (response.status === 200) {
//             setIsAuthorized(true);
//             setLoading(false);
//           }
//         });
//     };
//     checkToken();
//   });

//   return loading ? null : <Component />;
// }

// export default WithAuth;

import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }

    componentDidMount() {
      fetch("/auth/checkToken")
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: this.props.location } }}
          />
        );
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
