using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class ListMediator
    {
        //Command Query Responsibility Segregation (CQRS)
        public class Query : IRequest<Result<List<Activity>>>{}  //return 

        public class Handler : IRequestHandler<Query, Result<List<Activity>>> //return 
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Activity>>> Handle(Query request , CancellationToken cancelationTo)  
            {
                return Result<List<Activity>>.Success(await _context.Activities.ToListAsync());
            }
        }
    }
}