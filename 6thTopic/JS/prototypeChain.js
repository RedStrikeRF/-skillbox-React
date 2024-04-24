export function getPrototypeChain(classOrModule) {
  const prototypeChain = [];
  let currentPrototype = classOrModule.prototype;
  while (currentPrototype) {
      prototypeChain.push(currentPrototype);
      currentPrototype = Object.getPrototypeOf(currentPrototype);
  }
  return prototypeChain;
}
