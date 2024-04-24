export async function loadClassOrModule(className) {
  let classOrModule;
  if (className.endsWith('.js')) {
      const module = await import(className);
      classOrModule = module.default;
  } else {
      classOrModule = window[className];
  }
  return classOrModule;
}
