import React from "react";
import { observable, action } from "mobx";

class FakeAuth {
  @observable isAuthenticated= false
  @action authenticate() {
    this.isAuthenticated = true
    // setTimeout(cb, 100); // fake async
  }
  @action signout() {
    this.isAuthenticated = false
    // setTimeout(cb, 100);
  }
}

export default new FakeAuth()
