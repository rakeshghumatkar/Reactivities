using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public decimal DiscountPercentage { get; set; }
        public decimal Rating { get; set; }
        public double Stock { get; set; }
        public string Brand { get; set; }
        public string Category { get; set; }
        public string thumbnail { get; set; }

        public List<string> images { get; set; }

    }
}