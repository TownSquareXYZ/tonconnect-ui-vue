declare module '*.vue' {
  import Vue from 'vue';
  const component: Vue & { [key: string]: unknown };
  export default component;
}
