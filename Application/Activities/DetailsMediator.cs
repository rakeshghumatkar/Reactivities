using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class DetailsMediator
    {
        public class Query : IRequest<Activity>  //return type
        {
            public Guid Id { get; set; } //argument
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context ;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}