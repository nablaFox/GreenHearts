# Green Hearts - RN version


## Repo Policy

- every component that is not in a folder is a shared component
- every folder used to describe a single component should have a "index.tsx" file with a default export
- every folder used to group together multiple components under a single category should have a "index.ts" file with named exports

- libs: project-independent code

- components/Themed: custom stylings applied to already existing components
- components/ActionHandlers/: components used to graphically handle user interaction outcomes
- components/Headers/: screen headers

- make something general only if it is required from > 2 different contexts

- every action handler is not specific to an error but to all the possible states of an action: they are action state handlers; 
status !== 'success' can be used to handle generic errors
status === 'some-specific-error' can be used to handle specific errors
status === 'loading' can be used to handle loading states
