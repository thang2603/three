import _ from "lodash";

// ...

const originalObject = useGLTF("/path/to/your/model.glb").scene;

// Deep copy the original object
const clonedObject = _.cloneDeep(originalObject);

// Now, you can modify the cloned object without affecting the original one
clonedObject.position.set(2, 0, 0);
