<template>
  <div class="loader" title="..loading"></div>
</template>

<style>
.loader,
.loader:after {
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
}
.loader {
  margin: 1px;
  font-size: 10px;
  position: relative;
  border-top: .1em solid rgba(100, 100, 100, 0.1);
  border-right: .1em solid rgba(100, 100, 100, 0.2);
  border-bottom: .1em solid rgba(100, 100, 100, 0.3);
  border-left: .1em solid #000;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
