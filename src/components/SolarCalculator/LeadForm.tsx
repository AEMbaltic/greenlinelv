import { useState } from "react";
import { Send } from "lucide-react";

const LeadForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", zip: "" });
  const [hasTechnicalApproval, setHasTechnicalApproval] = useState(false);
  const [installLocation, setInstallLocation] = useState({ ground: false, roof: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send data to your backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4">
          <Send className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Paldies!</h3>
        <p className="text-muted-foreground">Mēs ar jums sazināsimies tuvākajā laikā.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Vārds</label>
          <input
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jūsu vārds"
            className="w-full h-11 rounded-lg border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">E-pasts</label>
          <input
            type="email"
            required
            maxLength={255}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="jusu@epasts.lv"
            className="w-full h-11 rounded-lg border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Telefons</label>
          <input
            type="tel"
            required
            maxLength={20}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+371 20000000"
            className="w-full h-11 rounded-lg border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Pasta indekss</label>
          <input
            type="text"
            required
            maxLength={10}
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
            placeholder="LV-1001"
            className="w-full h-11 rounded-lg border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={hasTechnicalApproval}
            onChange={(e) => setHasTechnicalApproval(e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary accent-primary"
          />
          <span className="text-sm text-foreground">Atzīmējiet, ja ir jau iegūts tehniskais atzinums paneļu uzstādīšanai.</span>
        </label>

        <div>
          <p className="text-sm font-medium text-foreground mb-2">Paneļus uzstādīšu uz:</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={installLocation.ground}
                onChange={(e) => setInstallLocation({ ...installLocation, ground: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary accent-primary"
              />
              <span className="text-sm text-foreground">Zemes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={installLocation.roof}
                onChange={(e) => setInstallLocation({ ...installLocation, roof: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary accent-primary"
              />
              <span className="text-sm text-foreground">Jumta</span>
            </label>
          </div>
        </div>
      </div>
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto px-8 h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-solar-dark active:scale-[0.98] transition-all duration-200 shadow-solar-glow flex items-center justify-center gap-2 mx-auto"
      >
        <Send className="w-4 h-4" />
        Saņemt piedāvājumu
      </button>
    </form>
  );
};

export default LeadForm;
