<template>
  <div :class="$style.wrapper">
    <router-link
      :class="$style.link"
      :exact-active-class="$style.active"
      to="/"
    >
      Resources
    </router-link>
    <span>|</span>
    <router-link
      :class="$style.link"
      :exact-active-class="$style.active"
      to="/home"
    >
      Home
    </router-link>
    <span>|</span>
    <router-link
      :class="$style.link"
      :exact-active-class="$style.active"
      to="/redirect"
    >
      Redirect
    </router-link>
    <span>|</span>
    <router-link
      :class="$style.link"
      :exact-active-class="$style.active"
      to="/redirected-to"
    >
      RedirectedTo
    </router-link>
    <span>|</span>
    <router-link
      :class="$style.link"
      :exact-active-class="$style.active"
      to="/about"
    >
      About
    </router-link>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
  align-items: center;

  border: 1px solid rgb(222, 222, 222);
}
.link {
  margin: 4px 12px;
}
.active {
  color: orange;
}
</style>
