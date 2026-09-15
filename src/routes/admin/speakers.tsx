import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { SPEAKERS } from "@/data/conference";

export const Route = createFileRoute("/admin/speakers")({
  component: AdminSpeakers,
});

function AdminSpeakers() {
  const [speakers, setSpeakers] = useState(SPEAKERS);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", role: "", bio: "", initials: "" });

  const handleAdd = () => {
    if (!form.name || !form.role) return;
    const initials = form.name
      .split(" ")
      .filter((w) => w[0] === w[0].toUpperCase())
      .map((w) => w[0])
      .slice(0, 2)
      .join("");
    setSpeakers((prev) => [...prev, { ...form, initials }]);
    setForm({ name: "", role: "", bio: "", initials: "" });
    setShowForm(false);
  };

  const handleEdit = (i: number) => {
    setEditing(i);
    setForm({
      name: speakers[i].name,
      role: speakers[i].role,
      bio: speakers[i].bio,
      initials: speakers[i].initials,
    });
    setShowForm(true);
  };

  const handleUpdate = () => {
    if (editing === null) return;
    setSpeakers((prev) => prev.map((s, i) => (i === editing ? { ...s, ...form } : s)));
    setEditing(null);
    setForm({ name: "", role: "", bio: "", initials: "" });
    setShowForm(false);
  };

  const handleDelete = (i: number) => {
    setSpeakers((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Speakers</h1>
          <p className="mt-1 text-muted-foreground">Manage conference speakers and panelists.</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm({ name: "", role: "", bio: "", initials: "" });
          }}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="size-3.5" />
          Add Speaker
        </button>
      </div>

      {showForm ? (
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">
            {editing !== null ? "Edit Speaker" : "Add New Speaker"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Role *</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                placeholder="e.g. Keynote Speaker, Panelist, Moderator"
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold">Bio</label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button
              onClick={editing !== null ? handleUpdate : handleAdd}
              className="rounded-md bg-primary px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {editing !== null ? "Update" : "Add"} Speaker
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="rounded-md border border-input px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-extrabold text-primary">
                {speaker.initials}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(i)}
                  className="grid size-8 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-secondary"
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="grid size-8 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              {speaker.role}
            </p>
            <h3 className="mt-1 font-display text-base font-bold">{speaker.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {speaker.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
