using System.Text;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DummyController : ControllerBase
    {
        
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            using (var httpClient = new HttpClient())
            {
                // Replace with the actual URL of the third-party API
                var requestUri = "https://dummyjson.com/products";

                HttpResponseMessage response = await httpClient.GetAsync(requestUri);
                response.EnsureSuccessStatusCode();

                string responseData = await response.Content.ReadAsStringAsync();

                var productsResponse = JsonConvert.DeserializeObject<ProductResponse>(responseData);
                
                // Extract image URLs from the productsResponse
                //var imageUrls = productsResponse.Products.SelectMany(product => product.Title);
                return Ok(productsResponse);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            using (var httpClient = new HttpClient())
            {
                var baseUrl = "https://dummyjson.com/products";
                var requestUri = $"{baseUrl}/{id}";
                HttpResponseMessage response = await httpClient.GetAsync(requestUri);
                response.EnsureSuccessStatusCode();
                string productResponse = await response.Content.ReadAsStringAsync();
                var product = JsonConvert.DeserializeObject<Product>(productResponse);
                return Ok(product); 
            } 
        }

        // Need authentication
        // [HttpPost]
        // public async Task<IActionResult> CreateProduct([FromBody]Product product)
        // {
        //     using(var httpClient=new HttpClient())
        //     {
        //         var newproduct =  new Product();
        //         string json = JsonConvert.SerializeObject(product);

        //         var baseUrl = "https://dummyjson.com/products/add";

        //         var content = new StringContent(json, Encoding.UTF8, "application/json");

        //         HttpResponseMessage responseMessage = await httpClient.PostAsync(baseUrl,content);
        //         responseMessage.EnsureSuccessStatusCode();
        //         if(responseMessage.IsSuccessStatusCode)
        //         {
        //             return Ok(product);
        //         }
        //         else
        //         {
        //             return BadRequest(responseMessage);
        //         }

        //     }
        // }

    }
}