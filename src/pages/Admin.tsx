import { useState, useEffect } from "react";
import { Trash2, ArrowLeft, Inbox } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  hasTechnicalApproval: boolean;
  installLocation: { ground: boolean; roof: boolean };
  submittedAt: string;
}

const Admin = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("inquiries") || "[]");
    setInquiries(stored.reverse());
  }, []);

  const handleDelete = (id: string) => {
    const updated = inquiries.filter((i) => i.id !== id);
    setInquiries(updated);
    localStorage.setItem("inquiries", JSON.stringify(updated));
  };

  const locationLabel = (loc: { ground: boolean; roof: boolean }) => {
    const parts = [];
    if (loc.ground) parts.push("Zemes");
    if (loc.roof) parts.push("Jumta");
    return parts.length ? parts.join(", ") : "—";
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Atpakaļ
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              Klientu pieprasījumi
            </h1>
          </div>
          <span className="text-sm text-muted-foreground">
            {inquiries.length} ierakst{inquiries.length === 1 ? "s" : "i"}
          </span>
        </div>

        {inquiries.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <Inbox className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Nav neviena pieprasījuma.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card shadow-solar-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datums</TableHead>
                  <TableHead>Vārds</TableHead>
                  <TableHead>E-pasts</TableHead>
                  <TableHead>Telefons</TableHead>
                  <TableHead>Indekss</TableHead>
                  <TableHead>Tehn. atzinums</TableHead>
                  <TableHead>Uzstādīšana</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inq) => (
                  <TableRow key={inq.id}>
                    <TableCell className="whitespace-nowrap text-muted-foreground text-xs">
                      {new Date(inq.submittedAt).toLocaleDateString("lv-LV")}{" "}
                      {new Date(inq.submittedAt).toLocaleTimeString("lv-LV", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="font-medium">{inq.name}</TableCell>
                    <TableCell>{inq.email}</TableCell>
                    <TableCell>{inq.phone}</TableCell>
                    <TableCell>{inq.zip}</TableCell>
                    <TableCell>
                      {inq.hasTechnicalApproval ? (
                        <span className="text-primary font-medium">Jā</span>
                      ) : (
                        <span className="text-muted-foreground">Nē</span>
                      )}
                    </TableCell>
                    <TableCell>{locationLabel(inq.installLocation)}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        title="Dzēst"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
