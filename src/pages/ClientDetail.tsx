
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Video, 
  Calendar, 
  Briefcase, 
  FileText, 
  MapPin,
  Building,
  DollarSign,
  Clock,
  User,
  Users,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// This would be fetched from an API in a real application
import { interactions, clientsExtended } from "@/data/interactions";

// Function to get icon based on interaction type
const getInteractionIcon = (type: string) => {
  switch (type) {
    case "Phone Call":
      return <Phone className="h-4 w-4" />;
    case "Email":
      return <Mail className="h-4 w-4" />;
    case "Meeting":
      return <Calendar className="h-4 w-4" />;
    case "Video Call":
      return <Video className="h-4 w-4" />;
    case "Text Message":
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const ClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<any>(null);
  const [clientInteractions, setClientInteractions] = useState<any[]>([]);

  useEffect(() => {
    if (clientId) {
      // Find the client by ID
      const foundClient = clientsExtended.find(c => c.id === clientId);
      setClient(foundClient || null);
      
      // Filter interactions for the current client
      const filteredInteractions = interactions.filter(
        (interaction) => interaction.clientId === clientId
      );
      setClientInteractions(filteredInteractions);
    }
  }, [clientId]);

  // If client is not found, show a message
  if (!client) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-semibold mb-4">Client not found</h1>
          <Button onClick={() => navigate('/clients')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/clients')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {client.name?.split(" ").map((n: string) => n[0]).join("") || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{client.name || "Client"}</h1>
            <p className="text-muted-foreground">
              {client.id || "No ID"} • {client.type || "Unknown"} • {client.status || "Unknown"}
            </p>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Client Details</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information Section */}
              <div>
                <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="flex-1">{client.email || "No email provided"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="flex-1">{client.phone || "No phone provided"}</span>
                    </div>
                    {client.altPhone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="flex-1">{client.altPhone} (Alternative)</span>
                      </div>
                    )}
                    <div className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <span className="flex-1">{client.address || "No address provided"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Personal/Corporate Details Section */}
              <div>
                <h3 className="text-sm font-medium mb-2">
                  {client.type === "Individual" ? "Personal Details" : "Corporate Details"}
                </h3>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    {client.type === "Individual" ? (
                      <>
                        {client.dateOfBirth && (
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Date of Birth:</span>
                            <span>{new Date(client.dateOfBirth).toLocaleDateString()}</span>
                          </div>
                        )}
                        {client.occupation && (
                          <div className="flex items-center text-sm">
                            <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Occupation:</span>
                            <span>{client.occupation}</span>
                          </div>
                        )}
                        {client.employer && (
                          <div className="flex items-center text-sm">
                            <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Employer:</span>
                            <span>{client.employer}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {client.incorporationDate && (
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Incorporation Date:</span>
                            <span>{new Date(client.incorporationDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {client.industry && (
                          <div className="flex items-center text-sm">
                            <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Industry:</span>
                            <span>{client.industry}</span>
                          </div>
                        )}
                        {client.annualRevenue && (
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground mr-2">Annual Revenue:</span>
                            <span>{client.annualRevenue}</span>
                          </div>
                        )}
                      </>
                    )}
                    {client.referredBy && (
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground mr-2">Referred by:</span>
                        <span>{client.referredBy}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Case Management Section */}
              <div>
                <h3 className="text-sm font-medium mb-2">Case Management</h3>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground mr-2">Active Cases:</span>
                      <span>{client.cases || 0}</span>
                    </div>
                    {client.assignedAttorney && (
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground mr-2">Assigned Attorney:</span>
                        <span>{client.assignedAttorney}</span>
                      </div>
                    )}
                    {client.lastContact && (
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground mr-2">Last Contact:</span>
                        <span>{new Date(client.lastContact).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground mr-2">Documents:</span>
                      <span>{client.documents || 0}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notes Section */}
              {client.notes && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Client Notes</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start text-sm">
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <p>{client.notes}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Account Information */}
              <div>
                <h3 className="text-sm font-medium mb-2">Account Information</h3>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    {client.createdAt && (
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground mr-2">Client Since:</span>
                        <span>{new Date(client.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <Badge 
                        className="ml-6" 
                        variant={client.status === "Active" ? "default" : "secondary"}
                      >
                        {client.status || "Unknown"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interactions">
            {clientInteractions.length > 0 ? (
              <div className="space-y-3">
                {clientInteractions.map((interaction) => (
                  <Card key={interaction.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          {getInteractionIcon(interaction.type)}
                          <span className="ml-2 font-medium">{interaction.type}</span>
                          {interaction.status && (
                            <Badge className="ml-2" variant={
                              interaction.status === "Completed" ? "default" : 
                              interaction.status === "Pending Response" ? "secondary" : 
                              "outline"
                            }>
                              {interaction.status}
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(interaction.date).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">Case: </span>
                          <span className="text-sm">{interaction.caseName}</span>
                        </div>
                        
                        <p className="text-sm">{interaction.summary}</p>
                        
                        {interaction.notes && (
                          <div className="mt-1 text-sm text-muted-foreground border-l-2 border-muted pl-3 py-1">
                            {interaction.notes}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {interaction.followUpRequired && interaction.followUpDate && (
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                              Follow-up: {new Date(interaction.followUpDate).toLocaleDateString()}
                            </Badge>
                          )}
                          
                          {interaction.assignedTo && (
                            <Badge variant="outline">
                              Assigned: {interaction.assignedTo}
                            </Badge>
                          )}
                          
                          {interaction.duration && (
                            <Badge variant="outline">
                              Duration: {interaction.duration} min
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No interactions found for this client.
              </div>
            )}
          </TabsContent>

          <TabsContent value="cases">
            {client.cases > 0 ? (
              <div className="space-y-4">
                {/* This would be populated with actual case data in a real application */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium">
                      {clientInteractions.length > 0 ? clientInteractions[0].caseName : "Case Details"}
                    </h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">Case ID:</span>
                        <span>{clientInteractions.length > 0 ? clientInteractions[0].caseId : "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">Status:</span>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">Attorney:</span>
                        <span>{client.assignedAttorney || "Not assigned"}</span>
                      </div>
                      <Separator className="my-2" />
                      <p className="text-muted-foreground">
                        Detailed case information would appear here in a production environment.
                        This would include case type, court information, key dates, and status updates.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No active cases for this client.
              </div>
            )}
          </TabsContent>

          <TabsContent value="financial">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Financial Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground mr-2">Total Billed:</span>
                        <span className="font-medium">{formatCurrency(client.totalBilled || 0)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground mr-2">Outstanding:</span>
                        <span className={`font-medium ${client.outstandingBalance > 0 ? 'text-amber-600' : ''}`}>
                          {formatCurrency(client.outstandingBalance || 0)}
                        </span>
                      </div>
                    </div>
                    {/* Placeholder for a payment history summary */}
                    <div className="text-sm text-muted-foreground">
                      {client.outstandingBalance > 0 ? (
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                          <span>Payment of {formatCurrency(client.outstandingBalance)} due.</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span>All payments are up to date.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Placeholder for payment history */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Recent Transactions</h3>
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    Transaction history would appear here in a production environment.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Documents ({client.documents || 0})</h3>
                  </div>
                  {client.documents > 0 ? (
                    <div className="space-y-2">
                      {/* Placeholder for document list */}
                      <div className="text-sm text-muted-foreground">
                        Document list would appear here in a production environment.
                        This would include document name, type, upload date, and actions.
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No documents found for this client.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClientDetail;
