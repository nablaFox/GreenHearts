# Green Hearts - RN version

## Repo Specialities

- api: project-dependent code related to api calls
- libs: project-independent code
- modules: project-dependent expo native modules
- theme.json: app theme to be used by RN components & native modules
- components/Themed: custom stylings applied to already existing components
- components/ActionHandlers/: components used to graphically handle user interaction outcomes
- components/Headers/: screen headers

## Repo Policy

- every component that is not in a folder is a component shared between other components (not screens)
- every folder used to describe a single component should have a "index.tsx" file with a default export
- every folder used to group together multiple components under a single category should have a "index.ts" file with named exports
- make something general only if it is required from > 2 different contexts
- data initialization go in _layout.tsx files relative to portion of the app that needs it
- every api function should be used with a wrapped provided in the api folder, with safe types relative to the project
