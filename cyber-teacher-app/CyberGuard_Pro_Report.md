# CyberGuard: Interactive Network Security Simulation Platform
## A Developer's Jurisdiction Log & Technical Case Study

**Project Duration:** 4 Months (October 2025 – February 2026)
**Role:** Lead Developer & Architect
**Stack:** Next.js, TypeScript, Canvas API, Box2D (Physics), Anime.js

---

## 1. The Spark: Why Another Cybersecurity Tool?

It started with frustration. I was watching a friend struggle through a cybersecurity certification course. He was reading endless PDFs about TCP handshakes and packet headers, but his eyes were glazing over.

*"I know what a SYN packet is definition-wise,"* he told me, *"but I can't visualize it. I can't see the flow."*

That was the moment. We have tools like Wireshark that show us the raw data (the matrix), and we have high-level diagrams that show us the abstraction (the map). But we don't have the *movie*. We don't have a tool that lets students see a packet travel across a wire, get inspected by a firewall, dropped, or forwarded, in real-time.

**The Hypothesis:** If we could build a "flight simulator" for network packets—where you can break things safely—students would learn faster.

*(Placeholder: Initial napkin sketch of the network layout)*

---

## 2. Month 1: The "Hello World" of networks (October)

The beginning was humble. And ugly.

I opened VS Code and created `index.html`. No frameworks. No build steps. Just a canvas tag and some JavaScript.

My first goal was simple: Draw two circles and make a line between them.

```javascript
// The very first code
const canvas = document.getElementById('network');
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.arc(100, 100, 20, 0, Math.PI * 2); // Node A
ctx.stroke();
```

It worked. I had a circle. Then I added a function to animate a small dot moving between them.

**The First Failure:** I tried to model data transmission by just changing the color of the receiving node. It felt lifeless. It didn't look like "data." It looked like a traffic light. I realized early on that *movement* was key. The user needs to see the payload travel.

*(Placeholder: Screenshot of the first raw HTML prototype – black and white, primitive circles)*

---

## 3. The Learning Curve: TypeScript or Bust (Early November)

By week 3, I had spaghetti code. `node.js` (the file, not the runtime) was 800 lines of chaotic JavaScript. Properties like `x`, `y`, `id`, `connections` were being mutated everywhere. I'd pass a "packet" object to a function, and half the time it would crash because I forgot if I named the property `destination` or `target`.

I decided to migrate to **TypeScript**.

It was painful. I spent three days just fixing red squiggly lines.
* "Property 'velocity' does not exist on type 'Node'."
* "Argument of type 'string' is not assignable to parameter of type 'number'."

But then, the magic happened.

```typescript
interface Packet {
  id: string;
  sourceId: string;
  targetId: string;
  protocol: 'TCP' | 'UDP' | 'ICMP'; // This saved my life later
  payload: any;
}
```

Defining these interfaces forced me to actually *design* the system instead of just hacking it. It was the first mature engineering decision of the project.

---

## 4. Research Phase: Beyond the Basics (Mid-November)

I stopped coding for a week and just read. I needed to understand what a "simulation" actually meant in this context.

I dove into:
* **RFC documents:** Reading how ARP actually works (Who has IP x.x.x.x?).
* **Game loops:** How do games update state? 60 FPS requestAnimationFrame vs fixed time steps.
* **SOC Dashboards:** I looked at Splunk, Darktrace, and old-school Hollywood hacker screens (Swordfish, anyone?).

I realized I wasn't building a diagramming tool; I was building a **game engine**. The nodes were "actors," the packets were "entities," and the cables were the "physics world."

---

## 5. The 3D Misadventure (Late November - Lost Weeks)

This is the part I regret, but it taught me the most.

I thought, *"Cyberpunk means 3D. It needs to look like Tron."*

So I pulled in **Three.js**. I spent two weeks building a 3D scene. I had floating server racks, glowing cables, and a camera you could pan around.

**The Problems:**
1. **Complexity Explosion:** Raycasting (detecting clicks) in 3D is 10x harder than checking `distance(mouse, circle) < radius` in 2D.
2. **Performance:** My laptop fans sounded like a jet engine just rendering 10 nodes.
3. **UX Nightmare:** Labels were always facing the wrong way. Connecting two nodes required 3D spatial reasoning that detracted from the *educational* value.

**The Breaking Point:** I spent 3 days debugging a lighting issue where everything looked gray. I fixed it, and then realized: *It still doesn't teach networking better than a 2D map.*

I scraped the 3D branch. `git checkout main`. Back to 2D. It hurt to delete that code, but it saved the project.

*(Placeholder: Screenshot of the failed, glitchy 3D prototype)*

---

## 6. Community debugging

I hit a wall with the Bezier curves for the cables. How do you make a line curve naturally when nodes move?

I posted on a Discord for creative coding. "Math help: Control points for dynamic bezier curves?"

A user named *glitch_wizard* replied with a snippet about calculating midpoints and adding perpendicular offsets. It worked perfectly. It was a reminder that you don't have to solve every math problem from scratch.

---

## 7. The Pivot: 2D is the New 3D (December)

We were back in 2D, but I wanted it to *feel* premium. Not like a textbook diagram.

**The "Cyberpunk" Aesthetic:**
* Dark blue/black backgrounds (`#0a192f`).
* Neon cyan and magenta accents.
* Grid lines that scroll slowly in the background (retro-wave style).
* Glassmorphism for the UI panels.

I started using **Canvas API** directly for the network graph to get maximum performance (60fps with hundreds of packets) while using **React** for the UI overlay (buttons, menus). This hybrid approach was the sweet spot.

---

## 8. 2D Engine Design: The Heart of CyberGuard

I architected the engine into three distinct layers:

1.  **World State:** The "truth" of the simulation. What nodes exist? Who is connected to whom?
2.  **Physics system:** Nodes have mass and repulsion. If you drag one, the others shift slightly. It feels organic.
3.  **Packet Engine:** The busiest loop.
    *   `spawnPacket()`
    *   `updatePacketPositions()`
    *   `checkCollisions()` (Did the packet hit the firewall?)

```typescript
// The core loop
function gameLoop() {
  updatePhysics();
  updatePackets();
  checkWinConditions();
  draw();
  requestAnimationFrame(gameLoop);
}
```

---

## 9. Simulation Logic: It's Not Just Animations

This is where the "Education" part comes in. A packet isn't just a dot; it carries data.

**The Handshake:**
I implemented a simplified TCP handshake.
1.  **SYN:** Blue dot leaves Client.
2.  **SYN-ACK:** Green dot returns from Server.
3.  **ACK:** Blue dot confirms.
4.  **Connection Established:** The cable glows solid.

Teaching students that *"Data cannot flow until this finishes"* is a powerful visual lesson.

**Attacks & Defenses:**
*   **DDoS:** I created a spawner that fires 50 red packets per second. You watch the "Server" node's health bar drop.
*   **Firewall:** A logic gate on the cable. `if (packet.type === 'MALWARE') packet.kill()`. The visual feedback is a satisfying "shield block" animation.

---

## 10. UI Evolution

The UI went through three major revisions.

**v1:** Native HTML buttons. Ugly.
**v2:** Material UI. Too generic.
**v3:** Custom "Cyber" components.

I built `CyberButton`, `NeonCard`, and `TerminalWindow` components from scratch using Tailwind CSS.
The terminal uses a monospace font and has a "typing" effect for logs. It makes the user feel like a hacker, not a student.

*(Placeholder: Evolution of the UI - from basic buttons to the final glowing interface)*

---

## 11. Creating "Sandbox Mode"

The structured lessons were great, but I found myself just wanting to play.

I built **Sandbox Mode**.
*   "Here's an empty canvas."
*   "Here's a palette of nodes (Router, Firewall, Database)."
*   "Go break stuff."

Allows users to simulate "What if?" scenarios. *What if I put the firewall BEHIND the router? What if I have two DNS servers?*

---

## 12. Architecture Decisions

**Why Next.js?**
I needed easy routing for the different "Lessons" (Scenario 1, Scenario 2). Next.js file-based routing was perfect. Also, Fast Refresh made tweaking UI styles incredibly quick.

**State Management:**
I used **Zustand**. Redux was too boilerplate-heavy for a game loop. Zustand allowed me to have a `useStore.getState().nodes` access inside the animation loop without triggering React re-renders every 16ms (which would kill performance).

---

## 13. Security Considerations (Irony)

Building a security tool requires... security.
Even though this is a client-side simulation, I had to ensure:
*   Sanitization of inputs (even in the simulated terminal).
*   No execution of real commands (sandbox containment).
*   Rate limiting on the API routes (for the leaderboard/save feature).

---

## 14. Failures & Lessons Learned

**The "Over-Engineering" Trap:**
I spent 4 days trying to mock a *real* Linux file system for the server nodes. Overkill. Students just need to see `access.log`, not a full `/etc/` directory structure. I scaled it back to a simple JSON object map.

**Lesson:** Build for the *learning objective*, not for realism simulation accuracy. We are simulating *concepts*, not *electrons*.

---

## 15. The Breakthrough

Late one night in January, I had the "DDoS" lesson running.
I clicked "Start Attack." Functional red dots swarmed the screen. The server health dropped.
Then I dragged a "Firewall" node onto the active cable.
*Snap.* The cable split, the firewall inserted itself.
Suddenly, the red dots were hitting the firewall and vanishing. The server health stabilized.

I sat back and watched it. 
*I didn't just code a diagram. I coded a story.*

---

## 16. Tools of the Trade

*   **IDE:** VS Code (with Prettier & ESLint strictly enforced)
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript 5.0
*   **Styling:** Tailwind CSS + Framer Motion (for UI animations)
*   **Canvas Engine:** Custom built (no Phaser/Pixi, for learning purposes)
*   **Planning:** Excalidraw for logic flows.

---

## 17. Timeline

*   **Week 1-2:** Concept, wireframes, HTML prototype.
*   **Week 3-4:** TypeScript migration, core engine architecture.
*   **Week 5-7:** The 3D Detour (and return).
*   **Week 8:** Packet logic, TCP/IP flow simulation.
*   **Week 9-10:** Attack/Defense mechanics.
*   **Week 11:** UI Overhaul (The Cyberpunk reskin).
*   **Week 12:** Content creation (Scripting the lessons).
*   **Week 13-16:** Bug fixing, performance tuning, polish.

---

## 18. Final Reflection

CyberGuard started as a way to visualize packets. It ended up being a masterclass in software architecture for me.

I learned that **Educational Tech (EdTech)** is not about dumbing things down; it's about providing *better abstractions*.
When a student plays Level 4 ("Man in the Middle"), and they actually *see* the packet getting intercepted and modified in real-time, the concept clicks in a way a textbook never could.

The project is live. The code is clean. The simulation is stable.

*End of Log.*

---
