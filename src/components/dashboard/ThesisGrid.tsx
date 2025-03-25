import React, { useState } from "react";
import { Search, Filter, BookOpen, Calendar, User, Tag } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ThesisItem {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  thumbnailUrl: string;
  abstract: string;
  pdfUrl?: string;
}

interface ThesisGridProps {
  theses?: ThesisItem[];
  onThesisSelect?: (thesis: ThesisItem) => void;
}

const ThesisGrid = ({
  theses = [
    {
      id: "1",
      title: "Machine Learning Applications in Healthcare",
      author: "Jane Smith",
      date: "2023-05-15",
      category: "Computer Science",
      tags: ["AI", "Healthcare", "Data Science"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
      abstract:
        "This thesis explores the applications of machine learning algorithms in healthcare diagnostics and treatment planning.",
      pdfUrl: "https://arxiv.org/pdf/2104.13478.pdf",
    },
    {
      id: "2",
      title: "Sustainable Architecture in Urban Environments",
      author: "Michael Johnson",
      date: "2023-04-22",
      category: "Architecture",
      tags: ["Sustainability", "Urban Planning", "Green Design"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
      abstract:
        "An analysis of sustainable architectural practices and their implementation in modern urban environments.",
      pdfUrl: "https://arxiv.org/pdf/1904.12848.pdf",
    },
    {
      id: "3",
      title: "The Impact of Social Media on Mental Health",
      author: "Sarah Williams",
      date: "2023-03-10",
      category: "Psychology",
      tags: ["Social Media", "Mental Health", "Digital Wellbeing"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80",
      abstract:
        "This research examines the psychological effects of social media usage on mental health outcomes among young adults.",
    },
    {
      id: "4",
      title: "Quantum Computing: Challenges and Opportunities",
      author: "David Chen",
      date: "2023-06-05",
      category: "Physics",
      tags: ["Quantum Computing", "Technology", "Physics"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
      abstract:
        "An exploration of current challenges in quantum computing and potential future applications.",
    },
    {
      id: "5",
      title: "Biodiversity Conservation in Tropical Rainforests",
      author: "Emily Rodriguez",
      date: "2023-02-18",
      category: "Environmental Science",
      tags: ["Biodiversity", "Conservation", "Ecology"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1536147116438-62679a5e01f2?w=400&q=80",
      abstract:
        "This thesis examines strategies for biodiversity conservation in tropical rainforest ecosystems.",
    },
    {
      id: "6",
      title: "Ethical Implications of Artificial Intelligence",
      author: "Robert Kim",
      date: "2023-01-30",
      category: "Philosophy",
      tags: ["AI", "Ethics", "Technology"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80",
      abstract:
        "A philosophical analysis of ethical considerations in the development and deployment of artificial intelligence systems.",
    },
  ],
  onThesisSelect = () => {},
}: ThesisGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter theses based on search term and category
  const filteredTheses = theses.filter((thesis) => {
    const matchesSearch =
      thesis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.abstract.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || thesis.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = Array.from(
    new Set(theses.map((thesis) => thesis.category)),
  );

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by title, author, or keywords..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {filteredTheses.length} of {theses.length} theses
      </div>

      {/* Thesis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTheses.map((thesis) => (
          <Card
            key={thesis.id}
            className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-pink-100 hover:border-pink-300"
          >
            <div className="relative h-48 w-full overflow-hidden bg-pink-50">
              <img
                src={thesis.thumbnailUrl}
                alt={thesis.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">
                  {thesis.title}
                </CardTitle>
              </div>
              <CardDescription className="flex items-center gap-1 text-sm text-gray-500">
                <User className="h-3 w-3" /> {thesis.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 line-clamp-3">
                {thesis.abstract}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />{" "}
                {new Date(thesis.date).toLocaleDateString()}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start pt-2 border-t border-pink-50">
              <div className="flex flex-wrap gap-1 mb-2">
                {thesis.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-pink-50 text-pink-700 hover:bg-pink-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full border-pink-200 text-pink-700 hover:bg-pink-50"
                onClick={() => onThesisSelect(thesis)}
              >
                <BookOpen className="h-4 w-4 mr-2" /> View Thesis
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTheses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Tag className="h-12 w-12 text-pink-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No theses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThesisGrid;
