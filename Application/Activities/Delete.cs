using AutoMapper;
using MediatR;
using Persistence;

public class Delete 
{
    public class Command : IRequest
    {
        public Guid Id { get; set;}
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id);
             _context.Activities.Remove(activity);
             _context.SaveChangesAsync();
        }
    }
}