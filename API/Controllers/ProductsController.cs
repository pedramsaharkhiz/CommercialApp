using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<ProductBrand> _productsBrandRepo; //this way is more efficient with UnitOfWork pattern
        private readonly IGenericRepository<ProductType> _productsTypeRepo;
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IMapper _mapper;

        public ProductsController(
            IGenericRepository<Product> productsRepo,
            IGenericRepository<ProductBrand> productsBrandRepo,
            IGenericRepository<ProductType> productsTypeRepo,
            IMapper mapper
        )
        {
            _productsTypeRepo = productsTypeRepo;
            _productsBrandRepo = productsBrandRepo;
            _productsRepo = productsRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await _productsRepo.ListAsync(spec);
            return Ok(
                _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products)
            );
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]//for swagger
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]//for swagger
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);
            if(product==null)return NotFound(new ApiResponse(404));
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productsBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productsTypeRepo.ListAllAsync());
        }
    }
}
