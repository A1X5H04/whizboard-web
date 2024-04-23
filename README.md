[![Netlify Status](https://api.netlify.com/api/v1/badges/d28e983e-c4f9-49f5-bc60-cfb3ede002a9/deploy-status)](https://app.netlify.com/sites/whizboard/deploys)

# WhizBoard

WhizBoard is a collaborative brainstorming application designed to bring your team's ideas together in a seamless and interactive way. Drawing inspiration from platforms like Miro, WhizBoard provides a digital _SVG Canvas_ where you can brainstorm, strategize, and visualize your ideas in real-time.

## Features

- **Your Own Whizboard:** Create your own private whiteboard to brainstorm, strategize, and visualize your personal ideas. You can also create public boards to share with others, or a team board to collaborate with your team!

- **Real-Time Collaboration:** Brainstorm with your team in real-time, regardless of your geographical location. Changes made by users are instantly reflected on the board. Powered by [LiveBlocks](https://liveblocks.io/).

- **Lightweight SVG Canvas:** WhizBoard uses an SVG canvas to render your ideas. This allows for a smooth and interactive experience, even with a large number of elements on the board.

- **Made from Scratch:** The SVG canvas is built from scratch using React and SVG elements. This allows for a high level of customization and control over the board. Though, it may not be performant like other third-party libraries.

- **Interactive Elements:** Add interactive elements like sticky notes, shapes, lines, and text to your board. You can also pan and zoom to navigate the board easily.

- **Versatile Tools:** Use a variety of tools like sticky notes, shapes, lines, and text to capture and organize your thoughts.

- **Multiple Themes:** Choose from multiple themes to customize the look and feel of your board. With predefined set of cool themes from DaisyUI.

- **Easy Navigation:** Navigate the board easily with pan and zoom functionality. You can also follow other users to see what they're working on.

- **Export and Share:** Export your boards to various formats like PDF or PNG. Share your boards with others, even if they don't have a WhizBoard account.

## Tech Stack

WhizBoard is built using the following technologies:

- **Next.js:** A React framework for building server-rendered applications.
- **Clerk:** A user authentication and identity management platform.
- **LiveBlocks:** A real-time collaboration platform for building collaborative applications.
- **Tailwind CSS:** A utility-first CSS framework for building custom designs.
- **SVG:** Scalable Vector Graphics for rendering the board.
- **DaisyUI:** A component library for Tailwind CSS.
- **Phosphor Icons:** A flexible icon set for Tailwind CSS.

## Getting Started

Demo: [https://whizboard.netlify.app/](https://whizboard.netlify.app/)

To get started with WhizBoard, clone the repository and install the dependencies:

```bash
git clone https://github.com/a1x5h04/whizboard-web.git
cd whizboard-web
npm install
```

Then, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We welcome contributions from everyone. If you're interested in contributing, please see our [Contributing Guide](CONTRIBUTING.md).

## License

WhizBoard is [MIT licensed](LICENSE).
