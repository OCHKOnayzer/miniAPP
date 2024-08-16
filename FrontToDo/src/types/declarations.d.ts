declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
declare module '*.jpeg' {
    const value: string;
    export default value;
}
  
declare module '*.png' {
    const value: string;
    export default value;
}
  
declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}  
declare module 'uuid' {
    export function v4(): string;
  }
  