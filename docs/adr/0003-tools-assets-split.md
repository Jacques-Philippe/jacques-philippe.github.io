# Tools and Assets are separate portfolio categories

The single legacy `tools.html` page (titled "Assets", listing a mix of a Unity
Asset Store package and general open-source tools) is split into two routes:
`/tools` for general developer software (datalint, replica-sync) and `/assets`
for Unity Asset Store packages (Pedometer, the Office asset pack). Site
navigation becomes Home / Games / Tools / Assets / About.

They are kept separate because a Unity Asset Store package targets a specific
audience and marketplace and tells a different story from a general-purpose
open-source tool. Both categories render through the same `<ProjectCard>`; only
the data and outbound `Link` kinds differ.
