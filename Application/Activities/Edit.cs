using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
      public class Command : IRequest<Result<Unit>>
      {
        public Activity Activity { get; set; }
      }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler ( DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                if(activity == null)
                    return null;

                // used the automapper to map the  request activity model with newly created activity model
                // usage : rather than comparing and assigning each update field values we directly map all the field using autmapper
                _mapper.Map(request.Activity, activity);
                
                var result = await _context.SaveChangesAsync()>0;
                if(!result)
                    return Result<Unit>.Failure("Fail to edit the record");
                else
                    return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}