# Домик Знатика — локальный вариант 2026-09-02

Generated with the built-in imagegen tool, then composed as independently positioned HTML layers. IDs and prices in lib/decorations.ts are preserved; purchases are not migrated.

Assets: house-empty.png; items-white-v2.png. White sprite backdrop is removed at render time with an SVG filter. Explicit per-item atlas bounds live in components/domik/DomikScene.tsx.

Prompt set (final intent):
1. Preserve the chosen lavender-roof clay dollhouse composition, walls, windows, stairs, mint fence, lawn and flowers; remove squirrel, all movable furniture and three vegetable beds. Empty rooms and grass for independently purchased decorations.
2. Create a 5 by 4 atlas in the same pastel clay style: desk, bed, computer on stand, bookcase, sofa; dining set, wardrobe, flower picture, clock, curtains; lights, three vegetable beds, swing, lantern, walnut tree; balloons, bunting, cake, fireworks, full-body orange squirrel with green eyes and green leaf neckerchief based on the supplied mascot.
3. Preserve all objects and positions, replace the background with uniform white. Transparency attempts returned RGB files, so the final composition explicitly uses a render-time filter.

Local preview: /dev/domik-preview (404 outside development). No real account or purchase calls; controls only change local state. Main /domik keeps authenticated purchase and watering endpoints.

Verified: TypeScript noEmit; all three squirrel destinations; redirect during movement; zero objects when preview is empty and 19 when all selected; mobile viewport 390px. Preview-only, not deployed.

User adjustments: vegetable beds width 37%, tree width 11%, swing moved to x24/y73 width12% to clear foreground flowers. Squirrel starts between tomatoes and flowers.
