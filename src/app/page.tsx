"use client";

import type React from "react";

import { useState } from "react";
import { FileText, ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [paySlipCode, setPaySlipCode] = useState("");
  const router = useRouter();

  const handlePaySlipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paySlipCode.trim()) {
      window.open(
        `https://ruge.umss.edu.bo/index.php/CertificadoController/boleta_pdf/${encodeURIComponent(paySlipCode)}`,
        "_blank",
      );
    }
  };

  const handleImageCompress = () => {
    router.push("/compress-image");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Portal de Servicios RUGE
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accede a nuestros servicios auxiliares de manera rápida y sencilla
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Obtener Boleta de Pago
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Ingresa tu código de boleta para acceder a tu documento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaySlipSubmit} className="space-y-4">
                <div>
                  <Label
                    htmlFor="payslip-code"
                    className="text-sm font-medium text-gray-700"
                  >
                    Código de Boleta
                  </Label>
                  <Input
                    id="payslip-code"
                    type="text"
                    placeholder="Ingresa tu código de boleta"
                    value={paySlipCode}
                    onChange={(e) => setPaySlipCode(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  disabled={!paySlipCode.trim()}
                >
                  Acceder a Boleta
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-3 text-center">
                El código se encuentra en su bandeja de solicitudes en el portal
                RUGE
              </p>
            </CardContent>
          </Card>

          <Card
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-500"
            onClick={handleImageCompress}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <ImageIcon className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Comprimir Imagen
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Reduce el tamaño de tus imágenes manteniendo la calidad
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                Ir a Compresor
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                Soporta JPG, PNG, WebP y otros formatos
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500">
            ¿Necesitas ayuda?
            <span className="text-blue-600 hover:underline cursor-pointer">
              Contacta soporte
            </span>
          </p>
          <p className="text-gray-500 mt-2">
            © 2025 Portal de Servicios RUGE. Todos los derechos reservados
          </p>
          <p className="text-gray-500">
            <a
              href="mailto:guilad1233@gmail.com"
              className="text-blue-300 hover:underline"
            >
              guilad1233@gmail.com
            </a>
            <br />
            <a
              href="https://wa.me/59175946778"
              target="_blank"
              className="text-blue-300 hover:underline"
            >
              75946778
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
