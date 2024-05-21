using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest //return nothing so it dont have anything
        {
            public Activity Activity { get; set; } // getting an activity as argument
        }

        public class Handler : IRequestHandler<Command> 
        {
            private readonly DataContext _context ;
            public Handler(DataContext context)
            {
                 _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                _context.SaveChangesAsync();
            }
        }
    }
}